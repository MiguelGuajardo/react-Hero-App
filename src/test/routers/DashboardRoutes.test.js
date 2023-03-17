const { mount } = require("enzyme")
const { MemoryRouter } = require("react-router-dom")
const { AuthContext } = require("../../auth/authContext")
const { DashboardRoutes } = require("../../routers/DashboardRoutes")


describe('Pruebas en <DashboardRoutes />',()=>{

    const contextValue = {
        user: {
            logged:true,
            name:"Usuario"
        }
    }

    test('debe de mostrarse correctamente - Marvel',()=>{
        const wrapper = mount(
            <AuthContext.Provider value={contextValue} >
                <MemoryRouter initialEntries={['/']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>)

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.text-info').text().trim()).toBe('Usuario')
        expect(wrapper.find('h1').text().trim()).toBe('MarvelScreen')
    })

    test('debe de mostrarse correctamente de DC',()=>{

        const wrapper = mount(
            <AuthContext.Provider value={contextValue} >
                <MemoryRouter initialEntries={['/dc']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>)

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('h1').text().trim()).toBe('DCScreen')
    })
})