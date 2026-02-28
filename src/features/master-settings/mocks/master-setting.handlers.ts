"use client"

import { delay, http, HttpResponse } from "msw";
import { MasterSetting } from "../master-setting.schema";
import { mockMasterSettings } from "./master-setting.mock";

const masterSettings = [...mockMasterSettings];

export const masterSettingHandlers = [
  /**
   * FIX: Wrapped the array in an object with a 'data' key.
   * This matches the PaginatedResponse structure expected by useMasterSettings.
   */
  http.get("*/master-settings", async () => {
    await delay(400);
    return HttpResponse.json({
      data: masterSettings,
      total: masterSettings.length,
      page: 1,
      limit: 10
    });
  }),

  http.get("*/master-settings/:id", async ({ params }) => {
    const { id } = params;
    const setting = masterSettings.find((m) => m.id === id);
    
    if (!setting) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return HttpResponse.json(setting);
  }),

  http.patch("*/master-settings/:id", async ({ params, request }) => {
    try {
      await delay(600);
      const { id } = params;
      const data = (await request.json()) as Partial<MasterSetting>;
      const settingIndex = masterSettings.findIndex((m) => m.id === id);

      if (settingIndex === -1) {
        return HttpResponse.json(
          { message: "Master setting category not found" },
          { status: 404 }
        );
      }

      const updatedSetting: MasterSetting = {
        ...masterSettings[settingIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      if (data.values) {
        updatedSetting.values = data.values.map(v => ({
          ...v,
          id: v.id || `m-v-${Math.random().toString(36).substring(7)}`,
          isActive: v.isActive ?? true
        }));
      }

      masterSettings[settingIndex] = updatedSetting;
      return HttpResponse.json(updatedSetting, { status: 200 });
    } catch (e) {
      const error = e as Error;
      return HttpResponse.json(
        { message: "MSW Handler Error", error: error.message },
        { status: 500 }
      );
    }
  }),

  http.delete("*/master-settings/:id/values/:valueId", async ({ params }) => {
    const { id, valueId } = params;
    const settingIndex = masterSettings.findIndex((m) => m.id === id);

    if (settingIndex !== -1) {
      masterSettings[settingIndex].values = masterSettings[settingIndex].values.filter(
        (v) => v.id !== valueId
      );
      masterSettings[settingIndex].updatedAt = new Date().toISOString();
      return new HttpResponse(null, { status: 204 });
    }

    return new HttpResponse(null, { status: 404 });
  }),
];