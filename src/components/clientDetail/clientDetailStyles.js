// Shared green content card used for the right-hand pane of the client detail
// page. Most tabs get this wrapper applied by ClientDetailPage; the multi-step
// "Client details" form applies it itself so its Previous / Save buttons can
// sit outside the card.
export const CONTENT_CARD_SX = {
  bgcolor: "rgba(138, 198, 66, 0.15)",
  border: "1px solid #8AC642",
  borderRadius: "16px",
  px: 3,
  py: 2.5,
  minHeight: 420,
};
