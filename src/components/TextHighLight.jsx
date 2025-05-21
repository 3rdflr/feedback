function TextHighLight({ text, value }) {
  if (!value) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(value, "gi");

  return <strong>{text.replace(regex, (match) => `${match}`)}</strong>;
}

export default TextHighLight;
