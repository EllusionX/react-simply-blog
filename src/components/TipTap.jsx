import { useEffect, useState } from "react";
// src/Tiptap.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TipTapMenuBar from "./TipTapMenuBar";
// Tiptap extensions
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

const TipTap = ({ description, setDescription, isLink, setIsLink }) => {
  const editorPropClassStyle =
    "border-2 border-t-0 focus:outline-none p-4 min-h-96 prose-h2:font-bold prose-h2:text-2xl prose-h3:font-bold prose-h3:text-xl";

  const [editorPropClass, setEditorPropClass] = useState(editorPropClassStyle);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
        blockquote: {
          content: "paragraph*",
          HTMLAttributes: {
            class: "border-l-4 border-sky-500 pl-2 ",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class: "bg-zinc-200 p-4 rounded-md border-2 my-2",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-5",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-5",
          },
        },
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: "rounded-sm px-1",
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: false,
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "underline decoration-purple-700 text-purple-700",
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: editorPropClass,
      },
    },
    onUpdate: ({ editor }) => {
      // replace empty <p></p> when pressing enter to become <br/>
      // save data to useState setDescription.
      setDescription(editor.getHTML().replace(/<p><\/p>/g, "<br>"));
    },
  });

  useEffect(() => {
    if (!editor) {
      return undefined;
    }

    isLink
      ? setEditorPropClass(`${editorPropClassStyle} cursor-not-allowed`)
      : setEditorPropClass(`${editorPropClassStyle} cursor-text`);

    editor.setEditable(!isLink);
  }, [editor, isLink, setEditorPropClass]);

  return (
    <>
      <TipTapMenuBar editor={editor} isLink={isLink} setIsLink={setIsLink} />
      <EditorContent editor={editor} />
    </>
  );
};

export default TipTap;
