

# Security Fix: Implement Role-Based Access Control

## Overview
Fix the critical security vulnerabilities by implementing a proper role-based access control system. This will ensure only designated admin users can access customer inquiry data.

## Current Security Gaps

| Issue | Risk Level | Impact |
|-------|------------|--------|
| RLS policies use `true` for all authenticated users | CRITICAL | Any authenticated user can access/modify all inquiries |
| No admin role verification | CRITICAL | No distinction between admin and regular users |
| Signup API endpoint still accessible | MEDIUM | Malicious actors could create accounts via API |

## Implementation Steps

### Step 1: Create User Roles Infrastructure
Create a database migration to set up the roles system:

```sql
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Only admins can view roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
```

### Step 2: Create Security Definer Function
This function bypasses RLS to check roles without causing recursive issues:

```sql
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
```

### Step 3: Update Inquiries RLS Policies
Replace the overly permissive policies:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated users can delete inquiries" ON public.inquiries;

-- Create admin-only policies
CREATE POLICY "Admins can view all inquiries"
ON public.inquiries FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update inquiries"
ON public.inquiries FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete inquiries"
ON public.inquiries FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
```

### Step 4: Assign Admin Role to Existing User
After migration, you'll need to assign the admin role to your existing admin account:

```sql
-- Replace 'your-user-id' with the actual UUID from auth.users
INSERT INTO public.user_roles (user_id, role)
VALUES ('your-user-id', 'admin');
```

### Step 5: Update Admin Component
Add server-side role verification in the Admin page:

**File:** `src/pages/Admin.tsx`

Add a check to verify the user has admin role before displaying the dashboard:

```typescript
const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

useEffect(() => {
  const checkAdminRole = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();
    
    setIsAdmin(!!data && !error);
  };
  
  if (user) checkAdminRole();
}, [user]);

// Show access denied if not admin
if (isAdmin === false) {
  return <AccessDenied />;
}
```

### Step 6: Create useAdmin Hook (Optional Enhancement)
Create a reusable hook for admin role checking:

**File:** `src/hooks/useAdmin.tsx`

```typescript
export const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check admin role from user_roles table
  }, [user]);

  return { isAdmin, loading };
};
```

---

## Files to Create
- Database migration for user roles system

## Files to Modify
- `src/pages/Admin.tsx` - Add admin role verification
- `src/hooks/useAdmin.tsx` (new) - Reusable admin check hook

## Post-Implementation Steps

1. **Assign admin role**: After the migration runs, manually insert your admin user ID into the `user_roles` table
2. **Test access**: Verify that only the admin account can access the dashboard
3. **Monitor**: Check that non-admin authenticated users are properly blocked

## Security Improvements Summary

| Before | After |
|--------|-------|
| Any authenticated user can view all inquiries | Only admin role can view inquiries |
| Any authenticated user can modify/delete data | Only admin role can modify/delete |
| No role verification in code | Server-side role check before data access |
| RLS policies use `USING (true)` | RLS policies use `has_role()` function |

