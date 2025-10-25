"use client";

import React, { useState } from "react";

type Props = {
  initialError?: string | null;
};

export default function StudentDashboard({ initialError = null }: Props) {
  const [count, setCount] = useState<string>("");
  const [error] = useState<string | null>(initialError);

  const onKeypadClick = (n: number) => {
    setCount(String(n));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate backend call; for now no-op
  };

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-rose-50/40 p-4 sm:p-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-start justify-end">
          <a
            href="#"
            className="inline-flex select-none items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-black/5 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            View Orders
          </a>
        </div>

        <div className="mt-6 flex items-start justify-center">
          <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow ring-1 ring-black/5">
            <h2 className="mb-4 text-center text-xl font-semibold text-gray-800">
              Add Clothes for Laundry
            </h2>

            {error ? (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="space-y-4">
              <input
                type="number"
                inputMode="numeric"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                placeholder="Enter count"
                className="mx-auto block w-56 rounded-md border border-gray-300 bg-white px-3 py-2 text-center text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <div className="grid grid-cols-5 gap-3 px-2 sm:px-0">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => onKeypadClick(n)}
                    className="rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {n}
                  </button>
                ))}
              </div>

              <div className="pt-1 text-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-rose-700 px-5 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-black/5 transition-colors hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

