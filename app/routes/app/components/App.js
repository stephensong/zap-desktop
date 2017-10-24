import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LndSyncing from 'components/LndSyncing'
import LoadingBolt from 'components/LoadingBolt'
import Form from 'components/Form'
import ModalRoot from 'components/ModalRoot'
import Nav from 'components/Nav'
import Wallet from 'components/Wallet'
import styles from './App.scss'

class App extends Component {
  componentWillMount() {
    const { fetchTicker, fetchBalance, fetchInfo, newAddress, lnd: { syncing } } = this.props

    if (syncing) {
      fetchBlockHeight()
    }

    if (!syncing) {
      fetchTicker()
      fetchBalance()
      fetchInfo()
      newAddress('p2pkh')
    }
  }

  render() {
    const {
      lnd,
      syncPercentage,
      fetchBlockHeight,

      modal: { modalType, modalProps },
      showModal,
      hideModal,
      ticker,
      address: { address },
      balance,
      info,
      form,
      setCurrency,
      currentTicker,

      openPayForm,
      openRequestForm,
      formProps,
      closeForm,

      children
    } = this.props

    if (lnd.syncing) {
      return (
        <LndSyncing
          fetchBlockHeight={fetchBlockHeight}
          fetchingBlockHeight={lnd.fetchingBlockHeight}
          syncPercentage={syncPercentage}
        />
      ) 
    }

    if (!currentTicker) { return <LoadingBolt /> }

    return (
      <div>
        <ModalRoot
          modalType={modalType}
          modalProps={modalProps}
          hideModal={hideModal}
          currentTicker={currentTicker}
          currency={ticker.currency}
        />

        <Form formType={form.formType} formProps={formProps} closeForm={closeForm} />

        <Nav
          ticker={ticker}
          balance={balance}
          setCurrency={setCurrency}
          currentTicker={currentTicker}
          openPayForm={openPayForm}
          openRequestForm={openRequestForm}
        />

        <div className={styles.content}>
          <Wallet
            ticker={ticker}
            currentTicker={currentTicker}
            balance={balance}
            address={address}
            info={info}
            showModal={showModal}
          />
          {children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  modal: PropTypes.object.isRequired,
  ticker: PropTypes.object.isRequired,
  address: PropTypes.object.isRequired,
  balance: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  formProps: PropTypes.object.isRequired,
  closeForm: PropTypes.func.isRequired,

  fetchInfo: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  fetchTicker: PropTypes.func.isRequired,
  fetchBalance: PropTypes.func.isRequired,
  setCurrency: PropTypes.func.isRequired,
  openPayForm: PropTypes.func.isRequired,
  openRequestForm: PropTypes.func.isRequired,

  currentTicker: PropTypes.object,

  children: PropTypes.object.isRequired
}

export default App
