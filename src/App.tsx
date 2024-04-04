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
let initialTheme = false;
function themeHandler() {
	if (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme)").matches
	) {
		// Sprawdzenie preferowanego motywu
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			initialTheme = false;
		} else {
			initialTheme = true;
		}
	}
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
				<h2 className="desktopOnly">MARKDOWN</h2>
				<div className="headerFileInfo">
					<img src="/assets/icon-document.svg" alt="" />
					<div>
						<p>Document name</p>
						<button className="heading-medium">welcome.md</button>
					</div>
				</div>
				<button className="headerDeleteBtn">
					<img src="/assets/icon-delete.svg" alt="Delete document" />
				</button>
				<button className="headerSaveBtn">
					<img src="/assets/icon-save.svg" alt="Save changes" />
					<p>Save changes</p>
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
						onChange={() => console.log("zmiana")}></textarea>
				</section>
				<section className="previewSection">
					<div className="sectionHeader">
						<h2 className="heading-small">Preview</h2>
						<button>
							<img src="/assets/icon-show-preview.svg" alt="" />
						</button>
					</div>
					<textarea name="" id="" cols={30} rows={10}></textarea>
				</section>
			</main>
		</>
	);
}

export default App;
