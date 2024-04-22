import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./scss/index.scss";
import { welcomeContent } from "./scripts/welcome";

import formatDate from "./scripts/formatDate";
import type { document } from "./types/document";

// TODO:
// 1. zrobic tak by spacje miogly byc wielokrotne
// 2. Delete button
// 3. Preview button
// 4. By otwieral sie ostatni plik
// 5.

function handleMenu() {
	const menu = document.querySelector("aside");
	const header = document.querySelector("header");
	const main = document.querySelector("main");
	const asideButtons = menu?.querySelectorAll("button");
	const headerImage =
		header?.querySelector<HTMLImageElement>(".menuButtonImage");
	const headerButton =
		header?.querySelector<HTMLButtonElement>(".menuButton");

	if (menu?.ariaExpanded == "false") {
		menu?.setAttribute("aria-expanded", "true");
		header?.classList.add("translateContent");
		main?.classList.add("translateContent");
		menu?.classList.add("asideOpen");
		headerImage?.setAttribute("src", "/assets/icon-close.svg");
		headerButton?.classList.add("menuButtonClose");
		asideButtons?.forEach((button) => button.setAttribute("tabindex", "1"));
	} else if (menu?.ariaExpanded == "true") {
		menu?.setAttribute("aria-expanded", "false");
		header?.classList.remove("translateContent");
		main?.classList.remove("translateContent");
		menu?.classList.remove("asideOpen");
		headerButton?.classList.remove("menuButtonClose");
		asideButtons?.forEach((button) => button.setAttribute("tabindex", "0"));
		headerImage?.setAttribute("src", "/assets/icon-menu.svg");
	}
}

function handlePreviewButton() {}

let initialTheme: boolean = false;
let checkedVar: boolean;

function themeHandler() {
	checkedVar = !checkedVar;
	if (checkedVar) {
		document.body.setAttribute("data-color-scheme", "light");
		localStorage.setItem("theme", "light");
	} else if (!checkedVar) {
		document.body.setAttribute("data-color-scheme", "dark");
		localStorage.setItem("theme", "dark");
	}
}

document.addEventListener("DOMContentLoaded", addDefaultTheme);
function addDefaultTheme() {
	let localStorageThemeRaw = localStorage.getItem("theme");
	if (localStorageThemeRaw !== null) {
		if (localStorageThemeRaw === "dark") {
			initialTheme = false;
			document.body.setAttribute("data-color-scheme", "dark");
			checkedVar = false;
		} else if (localStorageThemeRaw === "light") {
			initialTheme = true;
			document.body.setAttribute("data-color-scheme", "light");
			checkedVar = true;
		}
	} else if (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme)").matches
	) {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			initialTheme = false;
			document.body.setAttribute("data-color-scheme", "dark");
			checkedVar = false;
		} else {
			initialTheme = true;
			document.body.setAttribute("data-color-scheme", "light");
			checkedVar = true;
		}
	}
}

function createPreview() {
	let fileContent: string[][] = [];
	const editingArea =
		document.querySelector<HTMLTextAreaElement>("#editingArea");
	const previewArea = document.querySelector<HTMLDivElement>("#previewArea");
	if (!editingArea || !previewArea) return;
	previewArea.innerHTML = "";
	const textToEdit = editingArea.value;

	let splittedLines = textToEdit.split("\n");

	splittedLines.forEach((line) => {
		fileContent.push(line.split(" "));
	});

	fileContent.forEach((line) => {
		switch (line[0]) {
			case "######":
				const h6 = document.createElement("h6");
				h6.className = "h6-md";
				h6.textContent = line.join(" ").substring(6);
				previewArea.appendChild(h6);
				break;
			case "#####":
				const h5 = document.createElement("h5");
				h5.className = "h5-md";
				h5.textContent = line.join(" ").substring(5);
				previewArea.appendChild(h5);
				break;
			case "####":
				const h4 = document.createElement("h4");
				h4.className = "h4-md";
				h4.textContent = line.join(" ").substring(4);
				previewArea.appendChild(h4);
				break;
			case "###":
				const h3 = document.createElement("h3");
				h3.className = "h3-md";
				h3.textContent = line.join(" ").substring(3);
				previewArea.appendChild(h3);
				break;
			case "##":
				const h2 = document.createElement("h2");
				h2.className = "h2-md";
				h2.textContent = line.join(" ").substring(2);
				previewArea.appendChild(h2);
				break;

			case "#":
				const h1 = document.createElement("h2");
				h1.className = "h1-md";
				h1.textContent = line.join(" ").substring(1);
				previewArea.appendChild(h1);
				break;
			case ">":
				const blockquote = document.createElement("blockquote");
				blockquote.className = "blockquote-md";
				blockquote.textContent = line.join(" ").substring(1);
				previewArea.appendChild(blockquote);
				break;
			case "-":
				const unorderedElem = document.createElement("div");
				unorderedElem.innerHTML = `<span></span><p>${line
					.join(" ")
					.substring(1)}</p>`;
				unorderedElem.className = "unordered-element-md";
				previewArea.appendChild(unorderedElem);
				break;
			case "":
				const emptyLine = document.createElement("span");
				emptyLine.className = "empty-line-md";
				previewArea.appendChild(emptyLine);
				break;
			default:
				switch (true) {
					case /\d\./.test(line[0]):
						const orderedElem = document.createElement("div");
						orderedElem.innerHTML = `<span>${
							line[0]
						}</span><p>${line
							.join(" ")
							.substring(line[0].length)}</p>`;
						orderedElem.className = "ordered-element-md";

						previewArea.appendChild(orderedElem);

						break;

					default:
						const span = document.createElement("span");
						span.className = "paragraph-md";
						span.textContent = line.join(" ");
						previewArea.appendChild(span);
						break;
				}
		}
	});
}

document.addEventListener("DOMContentLoaded", createLocalStorage);
async function createLocalStorage() {
	let documents: document[] = [];
	if (!localStorage.hasDeletedWelcome) {
		let hasDeletedWelcome: boolean = false;
		localStorage.setItem(
			"hasDeletedWelcome",
			JSON.stringify(hasDeletedWelcome)
		);
		const newDate = await formatDate(new Date());
		const welcomeFile: document = {
			id: uuidv4(),
			createdAt: newDate,
			content: welcomeContent,
			title: "welcome.md",
		};
		documents.push(welcomeFile);
		localStorage.setItem("documents", JSON.stringify(documents));
	}
}

function App() {
	let firstTimeRender = true;

	let localStorageRaw = localStorage.getItem("documents");
	if (!localStorageRaw) return "You have no files! Create one.";
	let localStorageParsed: document[] = JSON.parse(localStorageRaw);

	const [renamingDoc, setRenamingDoc] = useState(false);
	const [documentName, setDocumentName] = useState<string>();
	const [documentID, setDocumentID] = useState<string>();
	const [documentContent, setDocumentContent] = useState<string | null>();
	const [listOfDocument, setListOfDocuments] =
		useState<document[]>(localStorageParsed);

	const renamingBtn =
		document.querySelector<HTMLButtonElement>(".renamingButton");

	async function createDocument() {
		let localStorageRaw = localStorage.getItem("documents");
		if (!localStorageRaw) return;
		let localStorageParsed: document[] = JSON.parse(localStorageRaw);
		const newDate = await formatDate(new Date());
		let newDoc: document = {
			id: uuidv4(),
			title: "untitled-document",
			createdAt: newDate,
			content: `${Date.now()}`,
		};
		localStorageParsed.push(newDoc);
		localStorage.documents = JSON.stringify(localStorageParsed);
		setListOfDocuments(localStorageParsed);
	}

	useEffect(() => {
		const editingArea = document.querySelector(
			"#editingArea"
		) as HTMLTextAreaElement;

		if (!editingArea || !documentContent) return;
		editingArea.value = "";
		editingArea.value = documentContent;
		editingArea.innerText += " ";
		if (!editingArea.textContent || !editingArea) return;
		// editingArea.textContent.trimEnd();
		setTimeout(createPreview, 1);
		// if (editingArea.textContent) createPreview;
	}, [documentContent]);

	useEffect(() => {
		let localStorageRaw = localStorage.getItem("documents");

		const editingArea = document.querySelector(
			"#editingArea"
		) as HTMLTextAreaElement;
		if (!localStorageRaw || !editingArea) return;
		let localStorageParsed: document[] = JSON.parse(localStorageRaw);
		setDocumentName(localStorageParsed[0].title);
		setDocumentContent(localStorageParsed[0].content);
		setDocumentID(localStorageParsed[0].id);
		setListOfDocuments(localStorageParsed);

		editingArea.value = localStorageParsed[0].content;
		editingArea.innerText += " ";
		if (!editingArea.textContent || !editingArea) return;
		firstTimeRender = false;
		setTimeout(createPreview, 1);
	}, [firstTimeRender]);

	return (
		<>
			<header>
				<button className="menuButton" onClick={() => handleMenu()}>
					<img
						className="menuButtonImage"
						src="/assets/icon-menu.svg"
						alt="Open menu"
					/>
				</button>
				<h2 className="desktopOnly headerLogoText">MARKDOWN</h2>
				<div className="headerFileInfo">
					<img src="/assets/icon-document.svg" alt="" />
					<div>
						<p className="body-small">Document name</p>

						{renamingDoc ? (
							<form
								className="fileNameChangeForm"
								onSubmit={(e) => {
									e.preventDefault();

									const renameDocInput =
										document.querySelector<HTMLInputElement>(
											"#renameDocInput"
										);
									if (
										!renameDocInput ||
										!renameDocInput.value
									)
										return;
									localStorageParsed.forEach((document) => {
										if (document.id === documentID) {
											document.title =
												renameDocInput.value;
											setListOfDocuments(
												localStorageParsed
											);
											localStorage.setItem(
												"documents",
												JSON.stringify(
													localStorageParsed
												)
											);
										}
									});
									if (renameDocInput?.value) {
										setDocumentName(renameDocInput?.value);
									}
									setRenamingDoc(false);
								}}>
								<input
									type="text"
									name="renameDocInput"
									id="renameDocInput"
									defaultValue={documentName}
									className="heading-medium"
								/>
								<button
									type="submit"
									className="acceptFileNameBtn">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 448 512">
										<g fill="#FFF">
											<path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
										</g>
									</svg>
								</button>
							</form>
						) : (
							<button
								className="heading-medium renamingButton"
								onClick={() => {
									if (renamingBtn?.innerText) {
										setDocumentName(renamingBtn?.innerText);
									}
									setRenamingDoc(true);
								}}>
								{documentName}
							</button>
						)}
					</div>
				</div>
				<button
					className="headerDeleteBtn"
					onClick={() => {
						const deleteDialog = document.querySelector(
							"#deleteDialog"
						) as HTMLDialogElement;
						if (!deleteDialog) return;

						deleteDialog.show();
					}}>
					<svg
						width="18"
						height="20"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z"
							fill="#7C8187"
						/>
					</svg>
				</button>
				<button
					className="headerSaveBtn"
					onClick={() =>
						localStorageParsed.forEach((doc) => {
							if (doc.id === documentID) {
								const editingArea = document.querySelector(
									"#editingArea"
								) as HTMLTextAreaElement;

								if (documentContent && editingArea.value) {
									doc.content = editingArea.value;
									localStorage.setItem(
										"documents",
										JSON.stringify(localStorageParsed)
									);
								}
							}
						})
					}>
					<img src="/assets/icon-save.svg" alt="Save changes" />
					<p className="heading-medium">Save changes</p>
				</button>
			</header>
			<aside aria-expanded="false">
				<h2>MARKDOWN</h2>
				<h3 className="heading-small">my documents</h3>
				<button
					className="newDocBtn heading-medium"
					onClick={() => createDocument()}>
					+ New Document
				</button>
				<ul className="documentList">
					{listOfDocument?.map((element) => {
						return (
							<li key={element.id} className="documentListItem">
								<img src="/assets/icon-document.svg" alt="" />
								<div>
									<p className="body-small">
										{element.createdAt}
									</p>
									<button
										className="heading-medium"
										onClick={() => {
											setDocumentName(element.title);
											setDocumentContent(element.content);
											setDocumentID(element.id);
											handleMenu();
											// loadDocument(element)
										}}>
										{element.title}
									</button>
								</div>
							</li>
						);
					})}
				</ul>
				<div className="themeSwitchWrapper">
					<img src="/assets/icon-dark-mode.svg" alt="" />
					<label className="switch">
						<input
							type="checkbox"
							defaultChecked={initialTheme}
							onChange={() => themeHandler()}
						/>
						<span className="slider"></span>
					</label>
					<img src="/assets/icon-light-mode.svg" alt="" />
				</div>
			</aside>
			<main>
				<section className="editingSection">
					<div className="sectionHeader">
						<h2 className="heading-small">MARKDOWN</h2>
						<button>
							<img src="/assets/icon-show-preview.svg" alt="" />
						</button>
					</div>
					<textarea
						name="editingArea"
						id="editingArea"
						className="edit-md"
						spellCheck="false"
						onLoadedData={() => {}}
						onChange={() => createPreview()}></textarea>
				</section>
				<section className="previewSection">
					<div className="sectionHeader">
						<h2 className="heading-small">PREVIEW</h2>
						<button>
							<img src="/assets/icon-show-preview.svg" alt="" />
						</button>
					</div>
					<div id="previewArea"></div>
				</section>
			</main>
			<dialog className="deleteDialog" id="deleteDialog">
				<h2>Delete this document?</h2>
				<p>
					Are you sure you want to delete the ‘{documentName}’
					document and its contents? This action cannot be reversed.
				</p>
				<button
					className="deleteDialog__negativeBtn"
					onClick={() => {
						const deleteDialog = document.querySelector(
							"#deleteDialog"
						) as HTMLDialogElement;

						if (!deleteDialog) return;
						deleteDialog.close();
					}}>
					<svg
						width="24"
						height="24"
						xmlns="http://www.w3.org/2000/svg">
						<g fillRule="evenodd">
							<path d="M2.1.686 23.315 21.9l-1.415 1.415L.686 2.1z" />
							<path d="M.686 21.9 21.9.685l1.415 1.415L2.1 23.314z" />
						</g>
					</svg>
				</button>
				<button
					onClick={() => {
						const deleteDialog = document.querySelector(
							"#deleteDialog"
						) as HTMLDialogElement;
						const editingArea = document.querySelector(
							"#editingArea"
						) as HTMLTextAreaElement;
						localStorageParsed.forEach((doc, index) => {
							if (doc.id === documentID) {
								localStorageParsed.splice(index, 1);
								setListOfDocuments(localStorageParsed);
								setDocumentName(localStorageParsed[0].title);
								setDocumentContent(
									localStorageParsed[0].content
								);
								setDocumentID(localStorageParsed[0].id);
								setListOfDocuments(localStorageParsed);

								editingArea.value =
									localStorageParsed[0].content;
								editingArea.innerText += " ";
								if (!editingArea.textContent || !editingArea)
									return;
								firstTimeRender = false;
								setTimeout(createPreview, 1);
								localStorage.setItem(
									"documents",
									JSON.stringify(localStorageParsed)
								);
							}
						});
						if (!deleteDialog) return;
						deleteDialog.close();
					}}>
					Confirm & Delete
				</button>
			</dialog>
		</>
	);
}

export default App;
