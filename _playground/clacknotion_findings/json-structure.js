const fs = require("fs");

const notionjson = [
  {
    object: "block",
    id: "05df0fc6-77c1-4940-9588-6a74f6cfe462",
    parent: {
      type: "page_id",
      page_id: "70a82eb4-2c58-4b5e-9011-599b691f869b",
    },
    created_time: "2024-03-08T20:17:00.000Z",
    last_edited_time: "2024-03-08T20:17:00.000Z",
    created_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    last_edited_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    has_children: false,
    archived: false,
    type: "heading_1",
    heading_1: {
      rich_text: [
        {
          type: "text",
          text: {
            content: "H1",
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: true,
            color: "default",
          },
          plain_text: "H1",
          href: null,
        },
        {
          type: "text",
          text: {
            content: " COLOUR COLOURBG",
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: " COLOUR COLOURBG",
          href: null,
        },
      ],
      is_toggleable: false,
      color: "default",
    },
  },
  {
    object: "block",
    id: "963ba706-a358-4ecc-aae0-fb19a7449deb",
    parent: {
      type: "page_id",
      page_id: "70a82eb4-2c58-4b5e-9011-599b691f869b",
    },
    created_time: "2024-03-08T20:17:00.000Z",
    last_edited_time: "2024-03-08T20:17:00.000Z",
    created_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    last_edited_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    has_children: false,
    archived: false,
    type: "paragraph",
    paragraph: {
      rich_text: [
        {
          type: "text",
          text: {
            content: "normal text",
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "normal text",
          href: null,
        },
      ],
      color: "default",
    },
  },
  {
    object: "block",
    id: "5f8c110f-e1ef-475d-8c8d-52c2713d720a",
    parent: {
      type: "page_id",
      page_id: "70a82eb4-2c58-4b5e-9011-599b691f869b",
    },
    created_time: "2024-03-08T20:17:00.000Z",
    last_edited_time: "2024-03-08T20:17:00.000Z",
    created_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    last_edited_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    has_children: false,
    archived: false,
    type: "to_do",
    to_do: {
      rich_text: [
        {
          type: "text",
          text: {
            content: "todo1",
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "todo1",
          href: null,
        },
      ],
      checked: false,
      color: "default",
    },
  },
  {
    object: "block",
    id: "72133521-2d4f-4def-a3fe-ea616c9b9292",
    parent: {
      type: "page_id",
      page_id: "70a82eb4-2c58-4b5e-9011-599b691f869b",
    },
    created_time: "2024-03-08T20:17:00.000Z",
    last_edited_time: "2024-03-08T20:17:00.000Z",
    created_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    last_edited_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    has_children: false,
    archived: false,
    type: "to_do",
    to_do: {
      rich_text: [
        {
          type: "text",
          text: {
            content: "todo2",
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "todo2",
          href: null,
        },
      ],
      checked: false,
      color: "default",
    },
  },
  {
    object: "block",
    id: "b5d3738e-2909-4afa-98a5-8ac018254517",
    parent: {
      type: "page_id",
      page_id: "70a82eb4-2c58-4b5e-9011-599b691f869b",
    },
    created_time: "2024-03-08T20:17:00.000Z",
    last_edited_time: "2024-03-08T20:17:00.000Z",
    created_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    last_edited_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    has_children: false,
    archived: false,
    type: "to_do",
    to_do: {
      rich_text: [
        {
          type: "text",
          text: {
            content: "todo3",
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "todo3",
          href: null,
        },
      ],
      checked: false,
      color: "default",
    },
  },
  {
    object: "block",
    id: "40face97-0bf6-454a-85d0-2799872b2c76",
    parent: {
      type: "page_id",
      page_id: "70a82eb4-2c58-4b5e-9011-599b691f869b",
    },
    created_time: "2024-03-08T20:17:00.000Z",
    last_edited_time: "2024-03-08T20:17:00.000Z",
    created_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    last_edited_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    has_children: true,
    archived: false,
    type: "quote",
    quote: {
      rich_text: [
        {
          type: "text",
          text: {
            content: "This is a quoteline1",
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "This is a quoteline1",
          href: null,
        },
      ],
      color: "default",
    },
  },
  {
    object: "block",
    id: "e1351b4b-69b5-43ff-897e-a66210ceea69",
    parent: {
      type: "page_id",
      page_id: "70a82eb4-2c58-4b5e-9011-599b691f869b",
    },
    created_time: "2024-03-08T20:17:00.000Z",
    last_edited_time: "2024-03-08T20:17:00.000Z",
    created_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    last_edited_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    has_children: false,
    archived: false,
    type: "code",
    code: {
      caption: [],
      rich_text: [
        {
          type: "text",
          text: {
            content: "this is code",
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "this is code",
          href: null,
        },
      ],
      language: "plain text",
    },
  },
  {
    object: "block",
    id: "aa5dd309-086b-490e-8bfa-64139ec692de",
    parent: {
      type: "page_id",
      page_id: "70a82eb4-2c58-4b5e-9011-599b691f869b",
    },
    created_time: "2024-03-08T20:17:00.000Z",
    last_edited_time: "2024-03-08T20:17:00.000Z",
    created_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    last_edited_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    has_children: false,
    archived: false,
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        {
          type: "text",
          text: {
            content: "bullet-list1",
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "bullet-list1",
          href: null,
        },
      ],
      color: "default",
    },
  },
  {
    object: "block",
    id: "3524a61e-1017-46fe-b863-bb8f519dd6fd",
    parent: {
      type: "page_id",
      page_id: "70a82eb4-2c58-4b5e-9011-599b691f869b",
    },
    created_time: "2024-03-08T20:17:00.000Z",
    last_edited_time: "2024-03-08T20:17:00.000Z",
    created_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    last_edited_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    has_children: false,
    archived: false,
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        {
          type: "text",
          text: {
            content: "bullet-list2",
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "bullet-list2",
          href: null,
        },
      ],
      color: "default",
    },
  },
  {
    object: "block",
    id: "594adb6b-cde2-4b72-b745-83fff6818783",
    parent: {
      type: "page_id",
      page_id: "70a82eb4-2c58-4b5e-9011-599b691f869b",
    },
    created_time: "2024-03-08T20:17:00.000Z",
    last_edited_time: "2024-03-08T20:17:00.000Z",
    created_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    last_edited_by: {
      object: "user",
      id: "bab0e102-e8b9-4861-be09-e9326cf86d5c",
    },
    has_children: false,
    archived: false,
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        {
          type: "text",
          text: {
            content: "bullet-list3",
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "bullet-list3",
          href: null,
        },
      ],
      color: "default",
    },
  },
];

const clackjson = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 1,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "code",
            },
          ],
          text: "H1",
        },
        {
          type: "text",
          text: " COLOUR COLOURBG",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "normal text",
        },
      ],
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: {
            checked: false,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "todo1",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: {
            checked: false,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "todo2",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: {
            checked: false,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "todo3",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This is a quoteline1",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "quoteline2",
            },
          ],
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          type: "text",
          text: "this is code",
        },
      ],
    },
    {
      type: "bulletList",
      attrs: {
        tight: true,
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "bullet-list1",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "bullet-list2",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "bullet-list3",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};


// const transformNotionToClack5 = (notionjson) => {
//   const clackjson = {
//     type: "doc",
//     content: [],
//   };

//   notionjson.forEach(block => {
//     switch (block.type) {
//       case "heading_1":
//         const headingContent = [];
//         block.heading_1.rich_text.forEach(text => {
//           headingContent.push({
//             type: "text",
//             text: text.text.content,
//             marks: text.annotations.code ? [{ type: "code" }] : [],
//           });
//         });
//         clackjson.content.push({
//           type: "heading",
//           attrs: {
//             level: 1,
//           },
//           content: headingContent,
//         });
//         break;

//       case "paragraph":
//         clackjson.content.push({
//           type: "paragraph",
//           content: [
//             {
//               type: "text",
//               text: block.paragraph.rich_text[0].text.content,
//             },
//           ],
//         });
//         break;

//       case "to_do":
//         clackjson.content.push({
//           type: "taskList",
//           content: [
//             {
//               type: "taskItem",
//               attrs: {
//                 checked: block.to_do.checked,
//               },
//               content: [
//                 {
//                   type: "paragraph",
//                   content: [
//                     {
//                       type: "text",
//                       text: block.to_do.rich_text[0].text.content,
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         });
//         break;

//       case "quote":
//         const quoteContent = block.quote.rich_text.map(text => ({
//           type: "paragraph",
//           content: [{ type: "text", text: text.text.content }],
//         }));
//         clackjson.content.push({
//           type: "blockquote",
//           content: quoteContent,
//         });
//         break;

//       case "code":
//         clackjson.content.push({
//           type: "codeBlock",
//           attrs: {
//             language: block.code.language,
//           },
//           content: [
//             {
//               type: "text",
//               text: block.code.rich_text[0].text.content,
//             },
//           ],
//         });
//         break;

//       case "bulleted_list_item":
//         clackjson.content.push({
//           type: "bulletList",
//           attrs: { tight: true },
//           content: [
//             {
//               type: "listItem",
//               content: [
//                 {
//                   type: "paragraph",
//                   content: [
//                     {
//                       type: "text",
//                       text: block.bulleted_list_item.rich_text[0].text.content,
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         });
//         break;

//       default:
//         break;
//     }
//   });

//   return clackjson;
// }

// fs.writeFile("clackJson.json", JSON.stringify(transformNotionToClack5(notionjson), null, 2), (err) => {
//     if (err) {
//         console.error("Error writing to file:", err);
//     } else {
//         console.log("File generated!");
//     }
// });



function transformNotionToClack4(notionJson) {
    const clackContent = [];

    notionJson.forEach(block => {
        switch (block.type) {
            case "heading_1":
                clackContent.push(transformHeading(block));
                break;
            case "paragraph":
                clackContent.push(transformParagraph(block));
                break;
            case "to_do":
                clackContent.push(...transformToDoList(block));
                break;
            case "quote":
                clackContent.push(transformQuote(block));
                break;
            case "code":
                clackContent.push(transformCode(block));
                break;
            case "bulleted_list_item":
                clackContent.push(transformBulletedListItem(block));
                break;
            default:
                console.warn(`Unsupported block type: ${block.type}`);
        }
    });

    return {
        type: "doc",
        content: clackContent.filter(block => block !== null) // Remove null values
    };
}

function transformHeading(block) {
    return {
        type: "heading",
        attrs: {
            level: 1
        },
        content: block.heading_1.rich_text.map(transformRichText)
    };
}

function transformParagraph(block) {
    return {
        type: "paragraph",
        content: block.paragraph.rich_text.map(transformRichText)
    };
}

function transformToDoList(block) {
    return block.to_do.rich_text.map(richText => ({
        type: "taskItem",
        attrs: {
            checked: block.to_do.checked
        },
        content: [{
            type: "paragraph",
            content: [transformRichText(richText)]
        }]
    }));
}

function transformQuote(block) {
    return {
        type: "blockquote",
        content: block.quote.rich_text.map(transformRichTextParagraph)
    };
}

function transformCode(block) {
    return {
        type: "codeBlock",
        attrs: {
            language: block.code.language
        },
        content: block.code.rich_text.map(transformRichText)
    };
}

function transformBulletedListItem(block) {
    return {
        type: "listItem",
        content: block.bulleted_list_item.rich_text.map(transformRichTextParagraph)
    };
}

function transformRichText(richText) {
    const marks = [];
    if (richText.annotations.code) {
        marks.push({ type: "code" });
    }
    return {
        type: "text",
        marks: marks,
        text: richText.plain_text
    };
}

function transformRichTextParagraph(richText) {
    return {
        type: "paragraph",
        content: [transformRichText(richText)]
    };
}

const clackJson = transformNotionToClack4(notionjson);
fs.writeFile("clackJson.json", JSON.stringify(clackJson, null, 2), (err) => {
    if (err) {
        console.error("Error writing to file:", err);
    } else {
        console.log("File generated!");
    }
});
console.log(clackJson);


// function transformNotionToClack3(notionJson) {
//   return {
//     type: "doc",
//     content: notionJson
//       .map((block) => {
//         switch (block.type) {
//           case "heading_1":
//             return transformHeading(block);
//           case "paragraph":
//             return transformParagraph(block);
//           case "to_do":
//             return transformToDo(block);
//           case "quote":
//             return transformQuote(block);
//           case "code":
//             return transformCode(block);
//           case "bulleted_list_item":
//             return transformBulletedListItem(block);
//           default:
//             console.warn(`Unsupported block type: ${block.type}`);
//             return null; // Ignore unsupported block types
//         }
//       })
//       .filter((block) => block !== null), // Remove null values
//   };
// }

// function transformHeading(block) {
//   return {
//     type: "heading",
//     attrs: {
//       level: 1,
//     },
//     content: block.heading_1.rich_text.map(transformRichText),
//   };
// }

// function transformParagraph(block) {
//   return {
//     type: "paragraph",
//     content: block.paragraph.rich_text.map(transformRichText),
//   };
// }

// function transformToDo(block) {
//   return {
//     type: "taskItem",
//     attrs: {
//       checked: block.to_do.checked,
//     },
//     content: block.to_do.rich_text.map(transformRichTextParagraph),
//   };
// }

// function transformQuote(block) {
//   return {
//     type: "blockquote",
//     content: block.quote.rich_text.map(transformRichTextParagraph),
//   };
// }

// function transformCode(block) {
//   return {
//     type: "codeBlock",
//     attrs: {
//       language: block.code.language,
//     },
//     content: block.code.rich_text.map(transformRichText),
//   };
// }

// function transformBulletedListItem(block) {
//   return {
//     type: "listItem",
//     content: block.bulleted_list_item.rich_text.map(transformRichTextParagraph),
//   };
// }

// function transformRichText(richText) {
//   const marks = [];
//   if (richText.annotations.code) {
//     marks.push({ type: "code" });
//   }
//   return {
//     type: "text",
//     marks: marks,
//     text: richText.plain_text,
//   };
// }

// function transformRichTextParagraph(richText) {
//   return {
//     type: "paragraph",
//     content: [transformRichText(richText)],
//   };
// }

// const clackJson = transformNotionToClack3(notionjson);
// fs.writeFile("clackJson.json", JSON.stringify(clackJson, null, 2), (err) => {
//   if (err) {
//     console.error("Error writing to file:", err);
//   } else {
//     console.log("File generated!");
//   }
// });
// console.log(clackJson);

// function transformNotionToClack2(notionJson) {
//  return {
//     type: "doc",
//     content: notionJson.map(block => {
//       switch (block.type) {
//         case "heading_1":
//           return {
//             type: "heading",
//             attrs: {
//               level: 1
//             },
//             content: block.heading_1.rich_text.map(richText => {
//               const marks = [];
//               if (richText.annotations.code) {
//                 marks.push({ type: "code" });
//               }
//               return {
//                 type: "text",
//                 marks: marks,
//                 text: richText.plain_text
//               };
//             })
//           };
//         case "paragraph":
//           return {
//             type: "paragraph",
//             content: block.paragraph.rich_text.map(richText => {
//               return {
//                 type: "text",
//                 text: richText.plain_text
//               };
//             })
//           };
//         case "to_do":
//           return {
//             type: "taskItem",
//             attrs: {
//               checked: block.to_do.checked
//             },
//             content: block.to_do.rich_text.map(richText => {
//               return {
//                 type: "paragraph",
//                 content: [{
//                  type: "text",
//                  text: richText.plain_text
//                 }]
//               };
//             })
//           };
//         case "quote":
//           return {
//             type: "blockquote",
//             content: block.quote.rich_text.map(richText => {
//               return {
//                 type: "paragraph",
//                 content: [{
//                  type: "text",
//                  text: richText.plain_text
//                 }]
//               };
//             })
//           };
//         case "code":
//           return {
//             type: "codeBlock",
//             attrs: {
//               language: block.code.language
//             },
//             content: block.code.rich_text.map(richText => {
//               return {
//                 type: "text",
//                 text: richText.plain_text
//               };
//             })
//           };
//         case "bulleted_list_item":
//           return {
//             type: "listItem",
//             content: block.bulleted_list_item.rich_text.map(richText => {
//               return {
//                 type: "paragraph",
//                 content: [{
//                  type: "text",
//                  text: richText.plain_text
//                 }]
//               };
//             })
//           };
//         default:
//           return null; // Ignore unsupported block types
//       }
//     }).filter(block => block !== null) // Remove null values
//  };
// }

// const clackJson = transformNotionToClack2(notionjson);
// fs.writeFile("clackJson", JSON.stringify(clackJson, null, 2), (err) => {
//     if (err) {
//       console.error("Error writing to file:", err);
//     } else {
//       console.log("File generated!");
//     }
//   });
// console.log(clackJson);

// function transformNotionToClack1(notionJson) {
//  return {
//     type: "doc",
//     content: notionJson.map(block => {
//       switch (block.type) {
//         case "heading_1":
//           return {
//             type: "heading",
//             attrs: {
//               level: 1
//             },
//             content: block.heading_1.rich_text.map(richText => {
//               const marks = [];
//               if (richText.annotations.code) {
//                 marks.push({ type: "code" });
//               }
//               return {
//                 type: "text",
//                 marks: marks,
//                 text: richText.plain_text
//               };
//             })
//           };
//         case "paragraph":
//           return {
//             type: "paragraph",
//             content: block.paragraph.rich_text.map(richText => {
//               return {
//                 type: "text",
//                 text: richText.plain_text
//               };
//             })
//           };
//         default:
//           return null; // Ignore unsupported block types
//       }
//     }).filter(block => block !== null) // Remove null values
//  };
// }

// Example usage
// const notionJson = [/* Your Notion JSON data */];
// const clackJson = transformNotionToClack1(notionjson);
//   fs.writeFile("clackJson", JSON.stringify(clackJson, null, 2), (err) => {
//     if (err) {
//       console.error("Error writing to file:", err);
//     } else {
//       console.log("File generated!");
//     }
//   });
// console.log(clackJson);
