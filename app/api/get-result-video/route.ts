import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_SUPABASE_SERVICE_ROLE!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Service Role Key is missing.");
}

const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET_NAME = process.env.NEXT_PUBLIC_STORAGE_RESULT_VIDEO_BUCKET;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const newId = url.searchParams.get("newId"); // newId 쿼리 파라미터 가져오기

    if (!newId) {
      return NextResponse.json(
        { error: "newId parameter is required" },
        { status: 400 }
      );
    }

    // newId를 3자리로 포맷 (예: 3 => 003)
    const formattedId = newId.padStart(3, "0");
    console.log(`Searching for video with id: ${formattedId}.mp4`);

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

    // newId.mp4 파일만 필터링
    const videoFile = files.find((file) => file.name === `${formattedId}.mp4`);

    if (!videoFile) {
      return NextResponse.json(
        { error: `Video file ${formattedId}.mp4 not found in the bucket` },
        { status: 404 }
      );
    }

    // 비디오 URL 반환
    const videoUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${videoFile.name}`;
    return NextResponse.json([{ name: videoFile.name, url: videoUrl }]);
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
