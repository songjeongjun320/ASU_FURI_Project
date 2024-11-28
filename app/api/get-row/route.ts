import { NextResponse } from "next/server";
import { getSupabaseClient } from "utils/supabase/server"; // createSupbaseClient 가져오기

const supabase = getSupabaseClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const selectedId = url.searchParams.get("selectedId"); // selectedId 쿼리 파라미터 가져오기

  if (!selectedId) {
    return NextResponse.json(
      { error: "Missing selectedId parameter" },
      { status: 400 }
    );
  }

  try {
    // Supabase에서 selectedId에 해당하는 데이터 가져오기
    const { data, error } = await supabase
      .from("main")
      .select("*")
      .eq("id", selectedId) // selectedId와 일치하는 데이터를 가져옴
      .single(); // 단일 행만 반환

    if (error) {
      console.error("LOG-- Error fetching data from Supabase:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("LOG-- Data fetched successfully:", data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("LOG-- Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
