import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

import App from '../../../src/App.tsx'
import * as StringUtil from "../../../src/functions/StringUtil.ts";

const DEFAULT_TITLE = "Vite + react!!"

// mockはファイル全体に影響するので、spyとファイルを分ける
describe('exportされた関数のspyサンプル', () => {
    describe("exportされた単純な関数をspyする", () => {
        it("spyして関数の利用のされかたを追跡する", () => {
            // 準備
            // spy変数を作成する
            // spyは関数の実装をデフォルトでは上書きしない
            // 関数の呼ばれ方などを追跡するのに便利
            const spy = vi.spyOn(StringUtil, "makeTitle");

            // 実行
            render(<App />)

            // 検証
            // 関数が壊れていないこと
            expect(screen.getByRole("heading").textContent).toBe(DEFAULT_TITLE)

            // 対象の関数が実行されたことを検証
            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledOnce()
            expect(spy).toHaveBeenCalledTimes(1)

            // 実行された際の引数の検証
            expect(spy).toHaveBeenCalledWith("vite + React")

            // 実行された際の返却値の検証
            expect(spy).toHaveReturnedWith(DEFAULT_TITLE)
        })
    })
})
