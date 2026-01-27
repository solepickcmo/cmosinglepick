import { Slot } from "../data/rouletteData";

export async function fetchAndParseCSV(url: string): Promise<Slot[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV: ${response.statusText}`);
        }
        const text = await response.text();
        return parseCSV(text);
    } catch (error) {
        console.error("Error fetching CSV:", error);
        return [];
    }
}

function parseCSV(csvText: string): Slot[] {
    const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== "");
    if (lines.length < 2) return [];

    const headers = lines[0].split(",").map(h => h.trim());
    const slots: Slot[] = headers.map(name => ({ name, values: [] }));

    for (let i = 1; i < lines.length; i++) {
        // Handle CSV parsing carefully (e.g., quoted strings) if needed, 
        // but for this simple use case, split by comma is likely sufficient 
        // unless data contains commas. 
        // For robustness, a regex or library is better, but let's stick to simple split for now
        // assuming simple keyword data.
        const values = lines[i].split(",");

        values.forEach((value, index) => {
            if (index < slots.length && value.trim() !== "") {
                slots[index].values.push(value.trim());
            }
        });
    }

    return slots;
}
