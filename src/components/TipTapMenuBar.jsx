import { useCallback, useState } from "react";

import {
  RiH2,
  RiH3,
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiUnderline,
  RiMarkPenLine,
  RiLink,
  RiDoubleQuotesR,
  RiCodeLine,
  RiListUnordered,
  RiListOrdered,
} from "react-icons/ri";

const TipTapMenuBar = ({ editor, isLink, setIsLink }) => {
  if (!editor) {
    return null;
  }

  // tailwind css for menu icons
  const activeStyle = "border-2 p-1 bg-gray-200";
  const notActiveStyle = "border-2 p-1";

  const [linkTarget, setLinkTarget] = useState("");
  const [linkName, setLinkName] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  // get user's selected text from the editor
  const getSelectedText = () => {
    const { view, state } = editor;
    const { from, to } = view.state.selection;
    const text = state.doc.textBetween(from, to, "");

    return text;
  };

  // link function
  const setLink = useCallback(() => {
    const url = linkTarget;

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      // update link if not empty
      // update linkName if user made changes
      if (getSelectedText() !== "" && getSelectedText() !== linkName) {
        editor.commands.insertContentAt(
          {
            from: editor.view.state.selection.from,
            to: editor.view.state.selection.to,
          },
          `<a href=${linkTarget}>${linkName}</a>`
        );
      } else {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .command(({ tr }) => {
            // at empty cursor and no given linkName
            if (tr.selection.empty && linkName == "") {
              tr.insertText(url);
              setLinkName(url);
            }
            // at empty cursor with given linkName
            else if (tr.selection.empty && linkName !== "") {
              tr.insertText(linkName, tr.selection.from, tr.selection.to);
            }
            return true;
          })
          .run();
      }
    }

    // reset to default useState value
    setLinkTarget("");
    setIsLink(false);
    setIsRequired(false);
  }, [editor, linkTarget, linkName]);

  return (
    <>
      <div className="flex flex-wrap sm:justify-space border-2 p-2 ">
        <fieldset
          disabled={isLink}
          className={
            isLink
              ? "[&>*]:mx-1 [&>*]:my-1 [&>*]:opacity-10 [&>*]:cursor-not-allowed"
              : "[&>*]:mx-1 [&>*]:my-1"
          }
        >
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 })
                ? activeStyle
                : notActiveStyle
            }
          >
            <RiH2 />
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 })
                ? activeStyle
                : notActiveStyle
            }
          >
            <RiH3 />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? activeStyle : notActiveStyle}
          >
            <RiBold />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? activeStyle : notActiveStyle}
          >
            <RiItalic />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? activeStyle : notActiveStyle}
          >
            <RiStrikethrough />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={
              editor.isActive("underline") ? activeStyle : notActiveStyle
            }
          >
            <RiUnderline />
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "#bae6fd" }).run()
            }
            className={
              editor.isActive("highlight", { color: "#bae6fd" })
                ? activeStyle
                : notActiveStyle
            }
          >
            <RiMarkPenLine />
          </button>
        </fieldset>
        <button
          type="button"
          onClick={() => {
            setLinkName(getSelectedText());
            setIsLink((prev) => !prev);
            editor.getAttributes("link").href !== undefined &&
              setLinkTarget(editor.getAttributes("link").href);
          }}
          className={
            editor.isActive("link")
              ? `${activeStyle} mx-1 my-1`
              : `${notActiveStyle} mx-1 my-1`
          }
        >
          <RiLink />
        </button>
        <fieldset
          disabled={isLink}
          className={
            isLink
              ? "[&>*]:mx-1 [&>*]:my-1 [&>*]:opacity-10 [&>*]:cursor-not-allowed"
              : "[&>*]:mx-1 [&>*]:my-1"
          }
        >
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={
              editor.isActive("blockquote") ? activeStyle : notActiveStyle
            }
          >
            <RiDoubleQuotesR />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={
              editor.isActive("codeBlock") ? activeStyle : notActiveStyle
            }
          >
            <RiCodeLine />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editor.isActive("bulletList") ? activeStyle : notActiveStyle
            }
          >
            <RiListUnordered />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editor.isActive("orderedList") ? activeStyle : notActiveStyle
            }
          >
            <RiListOrdered />
          </button>
        </fieldset>
      </div>
      {isLink && (
        <>
          <div className="border-2 border-t-0 p-2 flex justify-between items-end">
            <div className="flex flex-1 flex-col">
              <input
                type="text"
                value={linkName}
                onChange={(e) => setLinkName(e.target.value)}
                placeholder="Insert Link Name"
                required={isRequired}
                className="border-2 rounded-md focus:outline-sky-500 py-1 px-2 flex-1"
              />
              <input
                type="text"
                value={linkTarget}
                onChange={(e) => setLinkTarget(e.target.value)}
                placeholder="Insert hyperlink"
                required={isRequired}
                className="border-2 rounded-md focus:outline-sky-500 py-1 px-2 flex-1"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={setLink}
                className="border-2 border-sky-500 rounded-md px-2 py-1 mx-2"
              >
                add link
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLink(false);
                  setIsRequired(false);
                }}
                className="px-2, py-1"
              >
                cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default TipTapMenuBar;
