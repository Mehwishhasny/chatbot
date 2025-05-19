// Define interface for client data
export interface Client {
    name: string;
    contact: string;
    timestamp: string;
  }
  
  // Initialize clients array with explicit type
  let clients: Client[] = [];
  
  export async function POST(request: Request) {
    try {
      const { clientName, clientContact } = await request.json();
  
      if (!clientName || !clientContact) {
        return new Response(JSON.stringify({ message: 'Missing required fields' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      // Create submission with type safety
      const submission: Client = {
        name: clientName,
        contact: clientContact,
        timestamp: new Date().toISOString(),
      };
  
      // Log client details to Vercel logs
      console.log('New client submission:', submission);
  
      // Store in memory
      clients.push(submission);
  
      return new Response(JSON.stringify({ message: 'Data saved successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error saving data:', error);
      return new Response(JSON.stringify({ message: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  
  export async function GET() {
    try {
      return new Response(JSON.stringify(clients), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error retrieving data:', error);
      return new Response(JSON.stringify({ message: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }