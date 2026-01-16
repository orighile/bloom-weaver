import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { LogOut, Eye, Trash2, RefreshCw, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string | null;
  location: string;
  vision: string;
  budget_range: string | null;
  referral_source: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  quoted: 'bg-purple-100 text-purple-800',
  booked: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'booked', label: 'Booked' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const Admin = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchInquiries();
    }
  }, [user]);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to load inquiries');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setInquiries(inquiries.map(inquiry =>
        inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
      ));
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
      toast.success('Inquiry deleted successfully');
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast.error('Failed to delete inquiry');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const viewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDialogOpen(true);
  };

  if (loading || (!user && !loading)) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-champagne"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-charcoal-light hover:text-charcoal"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Site
            </Button>
            <h1 className="text-xl font-serif text-charcoal">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-charcoal-light">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg shadow-soft border border-border/50"
        >
          <div className="p-6 border-b border-border/50 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-serif text-charcoal flex items-center gap-2">
                Inquiries
                {inquiries.filter(i => i.status === 'new').length > 0 && (
                  <Badge className="bg-champagne text-white">
                    {inquiries.filter(i => i.status === 'new').length} new
                  </Badge>
                )}
              </h2>
              <p className="text-sm text-charcoal-light">
                {inquiries.length} total inquiries
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={fetchInquiries} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-champagne mx-auto"></div>
              <p className="text-charcoal-light mt-4">Loading inquiries...</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-charcoal-light">No inquiries yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inquiry) => (
                    <TableRow key={inquiry.id} className={inquiry.status === 'new' ? 'bg-champagne/5' : ''}>
                      <TableCell className="text-charcoal-light">
                        {format(new Date(inquiry.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="font-medium text-charcoal">
                        {inquiry.name}
                      </TableCell>
                      <TableCell className="capitalize text-charcoal-light">
                        {inquiry.event_type}
                      </TableCell>
                      <TableCell className="capitalize text-charcoal-light">
                        {inquiry.location}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={inquiry.status}
                          onValueChange={(value) => updateStatus(inquiry.id, value)}
                        >
                          <SelectTrigger className="w-[130px] h-8">
                            <Badge className={`${statusColors[inquiry.status] || 'bg-gray-100 text-gray-800'}`}>
                              {inquiry.status}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => viewInquiry(inquiry)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteInquiry(inquiry.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </main>

      {/* Inquiry Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif">Inquiry Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedInquiry && format(new Date(selectedInquiry.created_at), 'MMMM d, yyyy \'at\' h:mm a')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedInquiry && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-charcoal-light">Name</label>
                  <p className="text-charcoal">{selectedInquiry.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal-light">Email</label>
                  <p className="text-charcoal">
                    <a href={`mailto:${selectedInquiry.email}`} className="text-champagne hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal-light">Phone</label>
                  <p className="text-charcoal">
                    <a href={`tel:${selectedInquiry.phone}`} className="text-champagne hover:underline">
                      {selectedInquiry.phone}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal-light">Event Type</label>
                  <p className="text-charcoal capitalize">{selectedInquiry.event_type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal-light">Event Date</label>
                  <p className="text-charcoal">
                    {selectedInquiry.event_date
                      ? format(new Date(selectedInquiry.event_date), 'MMMM d, yyyy')
                      : 'Not specified'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal-light">Location</label>
                  <p className="text-charcoal capitalize">{selectedInquiry.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal-light">Budget Range</label>
                  <p className="text-charcoal">{selectedInquiry.budget_range || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal-light">Referral Source</label>
                  <p className="text-charcoal">{selectedInquiry.referral_source || 'Not specified'}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal-light">Vision</label>
                <p className="text-charcoal mt-1 whitespace-pre-wrap">{selectedInquiry.vision}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal-light">Status</label>
                <div className="mt-1">
                  <Select
                    value={selectedInquiry.status}
                    onValueChange={(value) => {
                      updateStatus(selectedInquiry.id, value);
                      setSelectedInquiry({ ...selectedInquiry, status: value });
                    }}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
