import { beforeEach, describe, it, expect, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'

import App from '../../../src/App.tsx'
import * as StringUtil from "../../../src/functions/StringUtil.ts";

const DEFAULT_TITLE = "Vite + react!!"
const MOCKED_TITLE = "mocked!!"

beforeEach(() => {
    cleanup();
});

// mockはファイル全体に影響するので、spyとファイルを分ける
describe('exportされた関数のspyサンプル', () => {
    describe('普通のケースの挙動を確認', () => {
        it('titleが存在すること', () => {
            // 準備
            // 実行
            render(<App />)

            // 検証
            expect(screen.getByRole("heading").textContent).toBe(DEFAULT_TITLE)
        })
    })
    describe("exportされた単純な関数をspyする", () => {
        it("spyして関数の利用のされかたを追跡する", () => {
            // 準備
            // spy変数を作成する
            // spyは関数の実装をデフォルトでは上書きしない
            // 関数の呼ばれ方などを追跡するのに便利
            const spy = vi.spyOn(StringUtil, "makeTitle");

            // 実行
            // App.tsxは内部でmakeTitle関数を使用する（はず）
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
        it("spyで一時的に関数の戻り値を変更する", () => {
            // 準備
            const spy = vi.spyOn(StringUtil, "makeTitle");
            spy.mockReturnValueOnce(MOCKED_TITLE)

            // 実行
            // App.tsxは内部でmakeTitle関数を使用する（はず）
            render(<App />)

            // 検証
            expect(spy).toHaveReturnedWith(MOCKED_TITLE)
            expect(screen.getByRole("heading").textContent).toBe(MOCKED_TITLE)

            // mockReturnValueOnceがOnceなことを確認する
            // js-domをcleanupした後、再度コンポーネントをレンダリングする
            cleanup()
            render(<App />)

            expect(screen.getByRole("heading").textContent).toBe(DEFAULT_TITLE)
        })
        describe("spyで恒久的に関数の戻り値を変更する", () => {
            it("spyで恒久的に関数の戻り値を変更する", () => {
                // 準備
                const spy = vi.spyOn(StringUtil, "makeTitle");
                spy.mockReturnValue(MOCKED_TITLE)

                // 実行
                // App.tsxは内部でmakeTitle関数を使用する（はず）
                render(<App />)

                // 検証
                expect(screen.getByRole("heading").textContent).toBe(MOCKED_TITLE)

                // mockReturnValueがeternalなことを確認する
                cleanup()
                render(<App />)

                expect(screen.getByRole("heading").textContent).toBe(MOCKED_TITLE)
            })
            it("戻り値の変更を破棄する", () => {
                // 準備
                const spy = vi.spyOn(StringUtil, "makeTitle");
                spy.mockReturnValue(MOCKED_TITLE)

                // 実行
                // App.tsxは内部でmakeTitle関数を使用する（はず）
                render(<App />)

                // 検証
                expect(screen.getByRole("heading").textContent).toBe(MOCKED_TITLE)

                // vi.restoreAllMocks()でmockReturnValueによる戻り値の変更を破棄する
                // https://vitest.dev/api/vi.html#vi-spyon
                // afterEach hooksで実行するのが良い
                vi.restoreAllMocks()
                cleanup()
                render(<App />)

                expect(screen.getByRole("heading").textContent).toBe(DEFAULT_TITLE)
            })
        })
    })
})
