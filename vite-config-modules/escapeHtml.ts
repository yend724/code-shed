export const escapeHtml = (string: string) => {
  return string.replace(/[&'`"<>]/g, (match: string | undefined) => {
    if (!match) return "";
    switch (match) {
      case "&":
        return "&amp;";
      case "'":
        return "&#x27;";
      case "`":
        return "&#x60;";
      case '"':
        return "&quot;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      default:
        return "";
    }
  });
};
