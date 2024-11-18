import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_SUPABASE_SERVICE_ROLE!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Service Role Key is missing.");
}

const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET_NAME = process.env.NEXT_PUBLIC_STORAGE_BUCKET;

export async function GET() {
  try {
    console.log("Fetching file list from Supabase Storage...");

    // Supabase Storage에서 파일 목록 가져오기
    const { data: files, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list();

    if (error) {
      console.error("Failed to fetch file list:", error.message);
      return NextResponse.json(
        { error: "Failed to fetch file list from Supabase" },
        { status: 500 }
      );
    }

    console.log("Fetched files:", files);

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files found in the bucket" },
        { status: 404 }
      );
    }

    // 파일 목록 반환
    return NextResponse.json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
