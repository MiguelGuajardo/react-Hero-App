import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../auth/authContext"
import { PrivateRoute } from "../../routers/PrivateRoute"

jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    Navigate:()=> <span>Saliendo de Aquí</span>
}))


describe('Prueba en <PrivateRoute />', () => {

    Storage.prototype.setItem = jest.fn()

    test('debe de mostrar el componente si está autenticado y guardar en el localStorage', () => {
        const contextValue = {
            user: {
                logged: true,
                name: "Fernando"
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>PrivateComponent</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(wrapper.text().trim()).toBe('PrivateComponent')
        expect( localStorage.setItem).toHaveBeenCalledWith("lastPath", "/")
    })

    test('debe de bloquear el componente si no está autenticado', () => {
        const contextValue = {
            user: {
                logged: false,
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>PrivateComponent</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(wrapper.text().trim()).toBe('Saliendo de Aquí')
    })
})