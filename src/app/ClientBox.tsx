"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    // 使用 classList 替代 className 以提高性能
    document.body.classList.add("antialiased");

    // 清理函数，组件卸载时移除类名
    return () => {
      document.body.classList.remove("antialiased");
    };
  }, []);

  return (
    <body className="antialiased" suppressHydrationWarning>
      {children}
    </body>
  );
}
