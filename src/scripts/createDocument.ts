import type { document } from "../types/document";
import { v4 as uuidv4 } from "uuid";
import formatDate from "./formatDate";
export default async function createDocument() {
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
}
