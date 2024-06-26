import { Context } from "../types.js";

export default async (ctx: Context): Promise<string> => {
  const depth = ctx.figmaDesignConfig.depth;
  const figmaConfigs = ctx.figmaDesignConfig.figma_config;
  let results = "";
  let figmaFileToken = '';
  const markBaseline = ctx.options.markBaseline;
  const buildName = ctx.options.buildName;

  for (const config of figmaConfigs) {

    figmaFileToken = config.figma_file_token;
    let queryParams = "";
    if (config.figma_ids && config.figma_ids.length > 0) {
      const fileIds = config.figma_ids.join(",");
      queryParams += `?ids=${fileIds}`;
    }
    
    const authToken = `Basic ${Buffer.from(`${ctx.env.LT_USERNAME}:${ctx.env.LT_ACCESS_KEY}`).toString("base64")}`

    const responseData = await ctx.client.getFigmaFilesAndImages(figmaFileToken, ctx.env.FIGMA_TOKEN, queryParams, authToken, depth, markBaseline, buildName ,ctx.log);

    if (responseData.data.message == "success") {
      results = responseData.data.message; 
    }
  }

  return results;
};