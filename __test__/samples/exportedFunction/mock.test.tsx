import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

import App from '../../../src/App.tsx'

const MOCKED_TITLE = "mocked!!"

// mockはmock宣言 → import(require)の順で評価される必要があるため、どこで宣言しても巻き上げられる
// https://zenn.dev/ptna/articles/617b0884f6af0e#mock%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%E3%81%AE%E5%B7%BB%E3%81%8D%E4%B8%8A%E3%81%92%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6
vi.mock("../../../src/functions/StringUtil.ts", async () => {
    // 一部関数のみimportする場合の方法
    // mock化はimportより先に実施されるため、import以外の参照方法が必要
    // https://vitest.dev/api/vi#vi-importactual
    const original = await vi.importActual("../../../src/functions/StringUtil.ts")
    return {
        ...original,
        makeTitle: vi.fn(() => MOCKED_TITLE),
    }
})

// mockはファイル全体に影響するので、spyとファイルを分ける
describe('exportされた関数のmockサンプル', () => {
    it("exportされた単純な関数をmockする", () => {
        // 準備
        // 検証
        render(<App />)

        // 検証
        // mockされた値が関数から返却されるはず
        expect(screen.getByRole("heading").textContent).toBe(MOCKED_TITLE)
    })
})
