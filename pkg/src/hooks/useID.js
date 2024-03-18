export default function useID(ns = "") {
  return (id) => (ns ? `${ns}-${id}` : id);
}
