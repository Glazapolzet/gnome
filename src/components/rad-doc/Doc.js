import './Doc.css';
import {Document, Page} from "react-pdf/dist/esm/entry.webpack5";

export default function Doc (props) {
  return (
    <Document
      file={props.link}
      loading={"Loading PDF..."}
      renderMode={"svg"}
    >
      <Page pageNumber={1} />
      <Page pageNumber={2} />
    </Document>
  )
}


