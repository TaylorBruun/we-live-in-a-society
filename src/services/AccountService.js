import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async editAccount(editData) {
    try {
      const res = await api.put('/account', editData)
      logger.log('account edited', res.data)
      AppState.account = res.data
      this.getAccount()
    } catch (error) {
      logger.error(error)
      Pop.toast(error.message, 'error')
    }
  }

  toggleEdit() {
    AppState.editingAccount = !AppState.editingAccount
  }
}

export const accountService = new AccountService()
