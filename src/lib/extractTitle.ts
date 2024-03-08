import { type JSONContent } from "@tiptap/core";

export const extractTitle = (value: JSONContent) => {
  let processedValue = value;

  if (typeof value === "string") {
    // convert into object

    processedValue = JSON.parse(value);
  }

  // Searching for the text inside the 'heading' type
  const contentArray = processedValue.content ?? [];
  for (const contentItem of contentArray) {
    if (!contentItem.content) {
      return "untitled";
    }
    for (const innerContent of contentItem.content) {
      const text = innerContent.text ?? "";
      return text.length > 36
        ? text.substring(0, 36) + "..."
        : text;
    }
  }
  return "untitled";
};