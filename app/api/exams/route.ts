import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "assets", "exams", "data.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading exams data:", error);
    return NextResponse.json(
      { error: "Failed to load exams list" },
      { status: 500 }
    );
  }
}
