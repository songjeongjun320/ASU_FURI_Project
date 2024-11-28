"use client";
import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 초기화
export const createSupbaseClient = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,

    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
