const fillElements = (
  window_title,
  title,
  description,
  copyright_description,
  copyright_authors,
  logo
) => {
  const defaultWindowTitle = "Acerca de…";
  const defaultTitle = "Firma Digital INTI";
  const defaultDescription = "";
  const defaultCopyrightDescription = "Desarrollado por";
  const defaultLogo = "favicon.ico";

  window_title = window_title ? window_title : defaultWindowTitle;
  title = title ? title : defaultTitle;
  description = description ? description : defaultDescription;
  copyright_description = copyright_description
    ? copyright_description
    : defaultCopyrightDescription;
  logo = logo ? logo : defaultLogo;

  const titleElement = document.getElementsByClassName("title")[0];
  const descriptionElement = document.getElementsByClassName("description")[0];
  const copyrightDescriptionElement = document.getElementById(
    "copyright-description"
  );
  const authorLinkWebsiteElement = document.getElementsByClassName(
    "author-link-website"
  )[0];

  document.title = window_title;
  titleElement.innerHTML = title;
  descriptionElement.innerHTML = description;
  copyrightDescriptionElement.innerHTML = copyright_description;
  authorLinkWebsiteElement.innerHTML = copyright_authors[0].name;
  authorLinkWebsiteElement.href = copyright_authors[0].link;

  document.getElementById("app-icon").src = logo;
};

window.ipcRenderer.send("about:info");
window.ipcRenderer.receive("about:info", (info) => {
  const {
    window_title,
    title,
    description,
    copyright_description,
    copyright_authors,
    logo,
  } = info;
  fillElements(
    window_title,
    title,
    description,
    copyright_description,
    copyright_authors,
    logo
  );
});

document
  .getElementsByClassName("author-link-website")[0]
  .addEventListener("click", (event) => {
    event.preventDefault();
    window.ipcRenderer.send("go-to-author-website", event.target.href);
  });
