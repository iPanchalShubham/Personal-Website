export type Navitem = {
    title:string
    href:string
    disabled?:boolean
}
export type MainNavItem = Navitem

export type HomeConfig= {
    mainNav:MainNavItem[]
}