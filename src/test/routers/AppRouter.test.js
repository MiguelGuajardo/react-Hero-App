import {AppRouter} from '../../routers/AppRouter'
import { mount } from 'enzyme'
import { AuthContext } from '../../auth/authContext'


describe('Pruebas en <AppRouter />',()=>{

    test('debe de mostrar el login si no esta autenticado', () => {
        
        const contextValue = {
            user: {
                logged: false
            }
        }
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue} >
                <AppRouter />
            </AuthContext.Provider>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('h1').text().trim()).toBe('Login')
    })

    test('debe de mostrar el componente de Marvel si esta autenticado', () => {
        
        const contextValue = {
            user: {
                logged: true,
                name:"Usuario"
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue} >
                <AppRouter />
            </AuthContext.Provider>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.navbar').exists()).toBe(true)
    })
})