import './Doc.css';
import {Document, Page} from "react-pdf/dist/esm/entry.webpack5";
import {pdfjs} from "react-pdf";

export default function Doc (props) {
  return (
    <Document
      options={{
        cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
        cMapPacked: true,
      }}
      file={props.link}
      loading={"Loading PDF..."}
      renderMode={"svg"}
    >
      <Page pageNumber={1} />
      <Page pageNumber={2} />
    </Document>
  )
}


