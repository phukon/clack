import { type JSONContent } from "@tiptap/core";

export const exportContentAsText = (value: JSONContent) => {
  let processedValue = value;

  if (typeof value === "string") {
    // convert into object
    processedValue = JSON.parse(value);
  }

  // Recursive function to find text in content
  const findText = (content: JSONContent): string[] => {
    let texts = [];

    // Base case: if the node itself is a text node, add its text to the array
    if (content.type === "text") {
      texts.push(content.text ?? "");
    }

    // Check if the content has a 'content' property, which indicates further nesting
    if (content.content && Array.isArray(content.content)) {
      for (const child of content.content) {
        // Recursively call the function for each child content in the content array
        texts = texts.concat(findText(child));
      }
    }

    // Return all found text values
    return texts;
  };

  // Searching for the text inside the 'paragraph' type
  const contentArray = processedValue.content ?? [];
  const textArray = contentArray.flatMap(findText);

  // Skip the first line
  return textArray;
};
