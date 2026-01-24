import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InquiryNotificationRequest {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string | null;
  location: string;
  vision: string;
  budget_range: string | null;
  referral_source: string | null;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const inquiry: InquiryNotificationRequest = await req.json();
    console.log("Received inquiry notification request:", inquiry);

    const smtpPassword = Deno.env.get("IONOS_SMTP_PASSWORD");
    if (!smtpPassword) {
      throw new Error("IONOS_SMTP_PASSWORD not configured");
    }

    // Create SMTP client for IONOS using STARTTLS (port 587)
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.ionos.com",
        port: 465,
        tls: true,
        auth: {
          username: "adeola@tpecflowers.com",
          password: smtpPassword,
        },
      },
    });

    // Format the email content
    const emailHtml = `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF9F7;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2D2D2D; font-size: 24px; margin-bottom: 5px;">🌸 New Inquiry from TPEC Flowers</h1>
          <p style="color: #6B6B6B; font-size: 14px;">You have received a new event inquiry</p>
        </div>
        
        <div style="background-color: white; padding: 25px; border-radius: 8px; border: 1px solid #E5E5E5;">
          <h2 style="color: #C9A87C; font-size: 18px; margin-bottom: 20px; border-bottom: 1px solid #E5E5E5; padding-bottom: 10px;">Contact Information</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B6B6B; width: 140px;">Name:</td>
              <td style="padding: 8px 0; color: #2D2D2D; font-weight: 500;">${inquiry.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B6B6B;">Email:</td>
              <td style="padding: 8px 0; color: #2D2D2D;"><a href="mailto:${inquiry.email}" style="color: #C9A87C;">${inquiry.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B6B6B;">Phone:</td>
              <td style="padding: 8px 0; color: #2D2D2D;"><a href="tel:${inquiry.phone}" style="color: #C9A87C;">${inquiry.phone}</a></td>
            </tr>
          </table>
          
          <h2 style="color: #C9A87C; font-size: 18px; margin: 25px 0 20px 0; border-bottom: 1px solid #E5E5E5; padding-bottom: 10px;">Event Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B6B6B; width: 140px;">Event Type:</td>
              <td style="padding: 8px 0; color: #2D2D2D; font-weight: 500;">${inquiry.event_type}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B6B6B;">Event Date:</td>
              <td style="padding: 8px 0; color: #2D2D2D;">${inquiry.event_date || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B6B6B;">Location:</td>
              <td style="padding: 8px 0; color: #2D2D2D;">${inquiry.location}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B6B6B;">Budget Range:</td>
              <td style="padding: 8px 0; color: #2D2D2D;">${inquiry.budget_range || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B6B6B;">Referral Source:</td>
              <td style="padding: 8px 0; color: #2D2D2D;">${inquiry.referral_source || 'Not specified'}</td>
            </tr>
          </table>
          
          <h2 style="color: #C9A87C; font-size: 18px; margin: 25px 0 20px 0; border-bottom: 1px solid #E5E5E5; padding-bottom: 10px;">Client's Vision</h2>
          <p style="color: #2D2D2D; line-height: 1.6; margin: 0; white-space: pre-wrap;">${inquiry.vision}</p>
        </div>
        
        <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #E5E5E5;">
          <p style="color: #6B6B6B; font-size: 12px;">This inquiry was submitted via the TPEC Flowers website</p>
        </div>
      </div>
    `;

    // Send the email
    await client.send({
      from: "TPEC Flowers <adeola@tpecflowers.com>",
      to: "adeola@tpecflowers.com",
      subject: `🌸 New Inquiry: ${inquiry.event_type} - ${inquiry.name}`,
      html: emailHtml,
    });

    await client.close();
    console.log("Email notification sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Notification sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
