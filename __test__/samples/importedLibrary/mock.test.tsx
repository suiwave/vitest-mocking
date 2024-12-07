import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/vitest';
import React from 'react'
import App from '../../../src/App.tsx'
import axios from 'axios';

const MOCKED_JSON = { message: 'Mocked fetch response' }

vi.mock('axios', async () => {
    const original = await vi.importActual('axios');
    return {
        default: {
            ...original,
            // 巻き上げられるため、他の変数を参照できない。なんかやり方はありそう。いったんそこはスコープ外
            get: vi.fn().mockResolvedValue({ data: { message: 'Mocked fetch response' } })
        }
    };
});


// // userインスタンスのセットアップ
const user = userEvent.setup();

// mockはファイル全体に影響するので、spyとファイルを分ける
describe('importしているライブラリのmockサンプル', () => {
    it("importしているライブラリをmockする", async () => {
        // 準備
        // 実行
        render(<App />)
        await user.click(screen.getByRole("button", { name: /axios/ }))

        // 検証
        // mockされた値が関数から返却されるはず
        await waitFor(() => expect(screen.getByText(JSON.stringify(MOCKED_JSON))).toBeInTheDocument())
    })
    it("importしているライブラリの一部だけmockできる", async () => {
        // 準備
        // 実行

        // 検証
        expect(axios.VERSION).toBe("1.7.9")
    })
})
