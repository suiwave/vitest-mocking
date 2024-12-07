import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/vitest';
import React from 'react'

import App from '../../../src/App.tsx'

const DEFAULT_JSON = { userId: 1, "id": 1, title: "delectus aut autem", completed: false }

// userインスタンスのセットアップ
const user = userEvent.setup();

describe('global関数関数のspyサンプル', () => {
    describe("global関数関数をspyする", () => {
        it("spyして関数の利用のされかたを追跡する", async () => {
            // 準備
            // spy変数を作成する
            // 第一引数にgrobalを指定することで、グローバル関数をspyできる
            const spy = vi.spyOn(global, "fetch");

            // 実行
            render(<App />)

            await user.click(screen.getByRole("button", { name: /fetch/ }))

            // 検証
            // 関数が壊れていないこと
            // ボタンがクリックされた後、画面表示が切り替わるまでに100msくらいのラグがあるので、waitForする
            await waitFor(() => expect(screen.getByText(JSON.stringify(DEFAULT_JSON))).toBeInTheDocument())

            // 対象の関数が実行されたことを検証
            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledOnce()
            expect(spy).toHaveBeenCalledTimes(1)

            // 実行された際の引数の検証
            expect(spy).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/todos/1")
        })
    })
})
