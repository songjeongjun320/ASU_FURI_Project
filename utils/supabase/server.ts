// utils/supabaseClient.ts

import { createClient, SupabaseClient } from "@supabase/supabase-js";

// 서버용 Supabase 클라이언트 생성 (서비스 역할 키 사용)
let supabase: SupabaseClient;

export function getSupabaseClient() {
  if (!supabase) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!, // 서버 환경에서만 안전한 URL
      process.env.NEXT_SUPABASE_SERVICE_ROLE! // 서버 환경에서만 안전한 서비스 역할 키
    );
  }
  return supabase;
}
