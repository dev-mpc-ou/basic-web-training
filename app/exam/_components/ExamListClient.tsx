"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Play, 
  Clock, 
  HelpCircle, 
  Calculator, 
  Droplet, 
  Globe2, 
  BookOpen, 
  Palette, 
  Music, 
  Cpu, 
  Settings,
  AlertCircle
} from "lucide-react";

type ExamListItem = {
  id: string;
  title: string;
  description?: string;
  duration: number;
  questionCount: number;
};

export function ExamListClient() {
  const { currentUser } = useUser();
  const [exams, setExams] = useState<ExamListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const icons = [Calculator, Droplet, Globe2, BookOpen, Palette, Music, Cpu, Settings];

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch("/api/exams");
        if (!res.ok) {
          throw new Error("Không thể tải danh sách bài kiểm tra");
        }
        const data = await res.json();
        setExams(data);
      } catch (err: any) {
        setError(err.message || "Lỗi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  return (
    <div className="container mx-auto px-4 max-w-5xl py-10 flex-grow flex flex-col justify-center">
      {/* Page Header */}
      <div className="mb-8 select-none">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
          <BookOpen className="text-orange-500" />
          Danh sách bài kiểm tra
        </h1>
        <p className="text-zinc-500 text-sm mt-1.5 leading-relaxed">
          Chọn một bài kiểm tra bên dưới để bắt đầu làm bài. Hãy đọc kỹ câu hỏi và làm bài thật cẩn thận nhé!
        </p>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Card key={n} className="flex flex-col h-48 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl">
              <CardHeader className="gap-2">
                <Skeleton className="h-4 w-28 rounded-full" />
                <Skeleton className="h-6 w-3/4 rounded-md" />
              </CardHeader>
              <CardContent className="flex-grow">
                <Skeleton className="h-4 w-full rounded-md mb-2" />
                <Skeleton className="h-4 w-2/3 rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 text-center text-red-600 dark:border-red-950/20 dark:bg-red-950/10 dark:text-red-400">
          <AlertCircle className="mx-auto h-8 w-8 mb-2.5" />
          <h3 className="font-bold text-sm">Không thể tải danh sách bài thi</h3>
          <p className="text-xs text-red-500 mt-1">{error}</p>
        </div>
      ) : exams.length === 0 ? (
        <div className="text-center py-16 text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm select-none">
          <HelpCircle size={48} className="mx-auto text-zinc-200 dark:text-zinc-800 mb-3" />
          <h3 className="font-semibold text-sm">Chưa có bài kiểm tra nào</h3>
          <p className="text-xs text-zinc-500 mt-1">Vui lòng quay lại sau nhé!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam, i) => {
            const IconComponent = icons[i % icons.length];
            return (
              <Card
                key={exam.id}
                className="flex flex-col border border-zinc-200/85 bg-white dark:bg-zinc-900 dark:border-zinc-800/85 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg rounded-2xl"
              >
                <CardHeader className="flex flex-row items-center gap-3.5 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 shadow-sm flex-shrink-0">
                    <IconComponent size={20} />
                  </div>
                  <div className="truncate">
                    <CardTitle className="text-sm font-bold text-zinc-855 dark:text-zinc-100 truncate" title={exam.title}>
                      {exam.title}
                    </CardTitle>
                    <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">{exam.id}</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                  <CardDescription className="text-zinc-500 dark:text-zinc-400 text-xs line-clamp-3 leading-relaxed">
                    {exam.description || "Bài kiểm tra kiến thức về các môn học Web."}
                  </CardDescription>
                  
                  <div className="flex items-center gap-3.5 mt-4 text-[10px] font-semibold text-zinc-400 select-none">
                    <span className="flex items-center gap-1">
                      <HelpCircle size={12} className="text-zinc-400" />
                      {exam.questionCount} câu hỏi
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-zinc-400" />
                      {exam.duration} phút
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 pb-5">
                  <Link href={`/exam/${exam.id}`} className="w-full">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-md text-xs font-bold gap-1 cursor-pointer">
                      <Play size={12} className="fill-white" />
                      Vào làm bài
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
