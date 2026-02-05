import Retell from "retell-sdk";

const retellClient = new Retell({
  apiKey: process.env.RETELL_API_KEY, // Must be server-side
});

export async function POST(req) {
  try {
    const webCallResponse = await retellClient.call.createWebCall({
      agent_id: process.env.NEXT_PUBLIC_RETELL_VOICE_AGENT_ID, // Voice agent
    });

    console.log("Web call response:", webCallResponse);

    return new Response(
      JSON.stringify({ access_token: webCallResponse.access_token }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error creating web call:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Failed to create call" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
