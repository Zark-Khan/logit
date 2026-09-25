import React from "react";
import ClientDetailsForm from "./ClientDetailsForm";

// Client details is always edited through the 5-step form; clients with an
// existing profile open with their answers pre-filled (see clientDetailsSeed.js).
export default function ClientDetailsTab({ client }) {
  return <ClientDetailsForm key={client.id} client={client} />;
}
