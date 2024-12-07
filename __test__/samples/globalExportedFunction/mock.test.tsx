import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/vitest';
import React from 'react'

import App from '../../../src/App.tsx'

const MOCKED_JSON = { message: 'Mocked fetch response' }

// mock関数ではなく、stubGlobal関数を使用する
vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(MOCKED_JSON),
    })
));

// userインスタンスのセットアップ
const user = userEvent.setup();

// mockはファイル全体に影響するので、spyとファイルを分ける
describe('global関数のmockサンプル', () => {
    it("global関数をmockする", async () => {
        // 準備
        // 検証
        render(<App />)
        await user.click(screen.getByRole("button", { name: /fetch/ }))

        // 検証
        // mockされた値が関数から返却されるはず
        expect(screen.getByText(JSON.stringify(MOCKED_JSON))).toBeInTheDocument()
    })
})
