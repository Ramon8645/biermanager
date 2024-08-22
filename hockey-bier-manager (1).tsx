import React, { useState } from 'react';
import { Plus, Minus, Beer, Truck, RefreshCw } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const members = ['RB', 'FR', 'MS', 'SS', 'AE', 'OK', 'OH', 'RO', 'DR', 'MJ', 'DA', 'GA'];

const HockeyBierManager = () => {
  const [orders, setOrders] = useState(
    members.reduce((acc, member) => ({
      ...acc,
      [member]: Array(3).fill({ want: 0, fetch: 0 })
    }), {})
  );

  const updateOrder = (member, period, type, value) => {
    setOrders(prevOrders => ({
      ...prevOrders,
      [member]: prevOrders[member].map((order, index) => 
        index === period ? { ...order, [type]: Math.max(0, order[type] + value) } : order
      )
    }));
  };

  const resetAllOrders = () => {
    setOrders(
      members.reduce((acc, member) => ({
        ...acc,
        [member]: Array(3).fill({ want: 0, fetch: 0 })
      }), {})
    );
  };

  return (
    <div className="p-2 max-w-md mx-auto bg-red-700 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-2 text-center text-yellow-300">Hockey Bier Manager</h1>
      <div className="grid grid-cols-4 gap-1 mb-2 bg-red-900 p-2 rounded-lg">
        <div className="font-semibold text-center">Name</div>
        {[1, 2, 3].map(period => (
          <div key={period} className="text-center">
            <div className="font-semibold">D{period}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-1">
        {members.map(member => (
          <div key={member} className="bg-red-800 p-2 rounded-lg shadow-sm">
            <div className="grid grid-cols-4 gap-1 items-center mb-1">
              <div className="font-bold text-yellow-300 flex items-center justify-between text-xl">
                <span>{member}</span>
                <Beer size={20} className="text-yellow-300" />
              </div>
              {[0, 1, 2].map(period => (
                <div key={period} className="grid grid-cols-3 gap-1">
                  <button onClick={() => updateOrder(member, period, 'want', -1)} className="bg-yellow-400 text-red-900 p-2 rounded shadow-sm hover:bg-yellow-500 transition-colors flex items-center justify-center">
                    <Minus size={16} />
                  </button>
                  <span className="flex items-center justify-center text-sm bg-red-900 rounded">{orders[member][period].want}</span>
                  <button onClick={() => updateOrder(member, period, 'want', 1)} className="bg-yellow-400 text-red-900 p-2 rounded shadow-sm hover:bg-yellow-500 transition-colors flex items-center justify-center">
                    <Plus size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-1 items-center">
              <div className="flex items-center justify-between">
                <div className="w-8"></div>
                <Truck size={20} className="text-yellow-300" />
              </div>
              {[0, 1, 2].map(period => (
                <div key={period} className="grid grid-cols-3 gap-1">
                  <button onClick={() => updateOrder(member, period, 'fetch', -1)} className="bg-yellow-400 text-red-900 p-2 rounded shadow-sm hover:bg-yellow-500 transition-colors flex items-center justify-center">
                    <Minus size={16} />
                  </button>
                  <span className="flex items-center justify-center text-sm bg-red-900 rounded">{orders[member][period].fetch}</span>
                  <button onClick={() => updateOrder(member, period, 'fetch', 1)} className="bg-yellow-400 text-red-900 p-2 rounded shadow-sm hover:bg-yellow-500 transition-colors flex items-center justify-center">
                    <Plus size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-red-900">
              <RefreshCw className="mr-2" size={16} />
              Alles zurücksetzen
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-red-800 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Eingabe zurücksetzen?</AlertDialogTitle>
              <AlertDialogDescription className="text-red-200">
                Diese Aktion setzt alle Eingaben auf 0 zurück. Möchten Sie fortfahren?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-red-700 text-white hover:bg-red-600">Abbrechen</AlertDialogCancel>
              <AlertDialogAction onClick={resetAllOrders} className="bg-yellow-400 text-red-900 hover:bg-yellow-500">Zurücksetzen</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default HockeyBierManager;
