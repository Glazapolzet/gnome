import './Doc.css';
import {Document, Page} from "react-pdf/dist/esm/entry.webpack5";
import {pdfjs} from "react-pdf";
import MoveBackArrow from "../back-arrow/MoveBackArrow";

export default function Doc (props) {
  return (
    <section className="Doc">
      <MoveBackArrow leadingTo={-1}/>
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
    </section>
  )
}


