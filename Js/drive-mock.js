function getFilesFromTextarea() {
  const raw = document.getElementById("files-input").value.trim();
  return raw ? JSON.parse(raw) : [];
}
