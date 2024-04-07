import "./scss/index.scss";

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
let initialTheme: boolean = false;
let checkedVar: boolean;
function themeHandler() {
	checkedVar = !checkedVar;
	if (checkedVar) {
		document.body.setAttribute("data-color-scheme", "light");
	} else if (!checkedVar) {
		document.body.setAttribute("data-color-scheme", "dark");
	}
}
document.addEventListener("DOMContentLoaded", addDefaultTheme);

function addDefaultTheme() {
	if (
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
	console.log(fileContent);
}

function App() {
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
						<button className="heading-medium">welcome.md</button>
					</div>
				</div>
				<button className="headerDeleteBtn">
					<img src="/assets/icon-delete.svg" alt="Delete document" />
				</button>
				<button className="headerSaveBtn">
					<img src="/assets/icon-save.svg" alt="Save changes" />
					<p className="heading-medium">Save changes</p>
				</button>
			</header>
			<aside aria-expanded="false">
				<h2>MARKDOWN</h2>
				<h3 className="heading-small">my documents</h3>
				<button className="newDocBtn heading-medium">
					+ New Document
				</button>
				<ul className="documentList">
					<li className="documentListItem">
						<img src="/assets/icon-document.svg" alt="" />
						<div>
							<p className="body-small">01 April 2024</p>
							<button className="heading-medium">
								untitled-document.md
							</button>
						</div>
					</li>
					<li className="documentListItem">
						<img src="/assets/icon-document.svg" alt="" />
						<div>
							<p className="body-small">01 April 2024</p>
							<button className="heading-medium">
								welcome.md
							</button>
						</div>
					</li>
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
		</>
	);
}

export default App;
