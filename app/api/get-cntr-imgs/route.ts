import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_SUPABASE_SERVICE_ROLE!;
const bucketname = process.env.NEXT_PUBLIC_STORAGE_CNTR_IMG_BUCKET;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: Request) {
  try {
    // 이미지 ID를 쿼리 매개변수로 가져오기
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Image ID is required." },
        { status: 400 }
      );
    }

    // 숫자로 변환 후 3자리 포맷팅
    const formattedId = parseInt(id, 10).toString().padStart(3, "0");

    // Supabase Storage에서 해당 이미지의 공개 URL 가져오기
    const { data } = supabase.storage
      .from(bucketname)
      .getPublicUrl(`${formattedId}.jpg`);

    if (!data || !data.publicUrl) {
      console.error("Error fetching image from storage: No public URL found.");
      return NextResponse.json(
        { error: "Failed to fetch image." },
        { status: 500 }
      );
    }

    // 반환된 URL을 클라이언트에 전달
    return NextResponse.json({ url: data.publicUrl });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
