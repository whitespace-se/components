import { useContext } from "react";
import urlTransformerContext from "../contexts/urlTransformerContext";

export default function useURLTransformer() {
  return useContext(urlTransformerContext).transformURL;
}
