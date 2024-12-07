import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/vitest';
import React from 'react'

import App from '../../../src/App.tsx'
import axios from 'axios';

const DEFAULT_JSON = { userId: 1, "id": 2, title: "quis ut nam facilis et officia qui", completed: false }

// userインスタンスのセットアップ
const user = userEvent.setup();

describe('importしているライブラリのspyサンプル', () => {
    describe("importしているライブラリをspyする", () => {
        it("spyして関数の利用のされかたを追跡する", async () => {
            // 準備
            // spy変数を作成する
            const spy = vi.spyOn(axios, "get");

            // 実行
            render(<App />)

            await user.click(screen.getByRole("button", { name: /axios/ }))

            // 検証
            // 関数が壊れていないこと
            await waitFor(() => expect(screen.getByText(JSON.stringify(DEFAULT_JSON))).toBeInTheDocument())

            // 対象の関数が実行されたことを検証
            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledOnce()
            expect(spy).toHaveBeenCalledTimes(1)

            // 実行された際の引数の検証
            expect(spy).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/todos/2")
        })
    })
})
