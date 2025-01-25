/**
 * 
 * Update Canvas by Id ** auth required **
 *  
 * POST canvas/[id] 
 */
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const id_device:number = event.context.params?.id as number;
  const { canvas, canvas_grid } = await readBody<{ canvas: string, canvas_grid: string }>(event)
  var res_profile:any = false

  const profile = await modelProfile.findById(user.id).populate('authorId')

  // Check ACL

  // Create Or Update

})