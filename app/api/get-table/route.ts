import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_SUPABASE_SERVICE_ROLE!; // 서버에서만 사용
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    // Supabase에서 데이터 가져오기
    const { data, error } = await supabase.from("main").select("*");

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
